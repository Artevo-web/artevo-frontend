"use client";

import { useEffect, useState } from "react";

interface Design {
    id: number;
    fileName: string;
    base64Data: string;
}

interface Props {
    artistId: number;
    onSelect: (design: Design) => void;
}

export default function ArtistPrintItemGallery({ artistId, onSelect }: Props) {
    const [designs, setDesigns] = useState<Design[]>([]);

    useEffect(() => {
        const fetchDesigns = async () => {
            const res = await fetch(`http://localhost:8080/api/designs/artist/${artistId}`);
            const data = await res.json();
            setDesigns(data);
        };
        fetchDesigns();
    }, [artistId]);

    const safeDesigns = Array.isArray(designs) ? designs : designs ? [designs] : [];

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {safeDesigns.map((d) => (
                <div
                    key={d.id}
                    className="border p-1 rounded cursor-pointer hover:shadow-md"
                    onClick={() => onSelect(d)}
                >
                    <img
                        src={`data:image/png;base64,${d.base64Data}`}
                        alt={d.fileName}
                        className="w-32 h-32 object-contain"
                    />
                    <p className="text-sm text-center mt-1">{d.fileName}</p>
                </div>
            ))}
        </div>
    );
}