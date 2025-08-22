"use client";

import { useState, useRef } from "react";

interface ArtistUploadProps {
    artistId: number;
    onSave: () => void;
}

export default function ArtistUpload({ artistId, onSave }: ArtistUploadProps) {
    const [design, setDesign] = useState<File | null>(null);
    const [designUrl, setDesignUrl] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setDesign(file);
        setDesignUrl(URL.createObjectURL(file));
        setPosition({ x: 0, y: 0 });
        setScale(1);
        setRotation(0);
    };

    const centerDesign = () => setPosition({ x: 0, y: 0 });

    const handleSave = async () => {
        if (!design) {
            alert("Bitte zuerst ein Design hochladen!");
            return;
        }

        const formData = new FormData();
        formData.append("artistId", artistId.toString());
        formData.append("file", design);
        formData.append("garmentType", "shirt");
        formData.append("shirtColor", "white");
        formData.append("posX", position.x.toString());
        formData.append("posY", position.y.toString());
        formData.append("scale", scale.toString());
        formData.append("rotation", rotation.toString());

        try {
            const res = await fetch("http://localhost:8080/api/printitems", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error("Fehler beim Speichern");
            alert("PrintItem erfolgreich erstellt!");
            onSave();
            setDesign(null);
            setDesignUrl(null);
            setPosition({ x: 0, y: 0 });
            setScale(1);
            setRotation(0);
        } catch (err) {
            console.error(err);
            alert("Speichern fehlgeschlagen!");
        }
    };

    return (
        <div className="flex gap-6 p-6">
            <div
                ref={canvasRef}
                className="relative w-[300px] h-[400px] bg-white border shadow flex items-center justify-center"
            >
                <img src="/images/shirt-white.png" alt="Shirt Mockup" className="w-full h-full object-contain" />
                {designUrl && (
                    <img
                        src={designUrl}
                        alt="Design"
                        className="absolute cursor-move"
                        style={{
                            left: `calc(50% + ${position.x}px)`,
                            top: `calc(50% + ${position.y}px)`,
                            transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                            maxWidth: "80%",
                            maxHeight: "80%",
                        }}
                        draggable
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const initPos = { ...position };
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                setPosition({
                                    x: initPos.x + moveEvent.clientX - startX,
                                    y: initPos.y + moveEvent.clientY - startY,
                                });
                            };
                            const handleMouseUp = () => {
                                window.removeEventListener("mousemove", handleMouseMove);
                                window.removeEventListener("mouseup", handleMouseUp);
                            };
                            window.addEventListener("mousemove", handleMouseMove);
                            window.addEventListener("mouseup", handleMouseUp);
                        }}
                    />
                )}
            </div>

            <div className="flex flex-col gap-4">
                <input type="file" accept="image/png" onChange={handleUpload} />
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={centerDesign}>
                    Zentrieren
                </button>
                <label className="flex flex-col gap-1">
                    Größe
                    <input type="range" min="0.1" max="2" step="0.01" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-48" />
                </label>
                <label className="flex flex-col gap-1">
                    Rotation
                    <input type="range" min="-180" max="180" step="1" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-48" />
                </label>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4" onClick={handleSave}>
                    PrintItem speichern
                </button>
            </div>
        </div>
    );
}
