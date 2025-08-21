"use client";

import { useState, useRef } from "react";

export default function ArtistUpload() {
    const [design, setDesign] = useState<File | null>(null);
    const [designUrl, setDesignUrl] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1); // 1 = 100%

    // PNG Upload
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setDesign(file);
        setDesignUrl(URL.createObjectURL(file));
        setPosition({ x: 0, y: 0 }); // zentriert
    };

    // Zentrieren
    const centerDesign = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="flex gap-6 p-6">
            {/* Canvas / Shirt-Mockup */}
            <div
                ref={canvasRef}
                className="relative w-[300px] h-[400px] bg-white border shadow flex items-center justify-center"
            >
                {/* Shirt Bild */}
                <img
                    src="/images/shirt-white.png"
                    alt="Shirt Mockup"
                    className="w-full h-full object-contain"
                />

                {/* Design Overlay */}
                {designUrl && (
                    <img
                        src={designUrl}
                        alt="Design"
                        className="absolute cursor-move"
                        style={{
                            left: `calc(50% + ${position.x}px)`,
                            top: `calc(50% + ${position.y}px)`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
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
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={centerDesign}
                >
                    Zentrieren
                </button>
                <label className="flex flex-col gap-1">
                    Größe
                    <input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-48"
                    />
                </label>
            </div>
        </div>
    );
}
