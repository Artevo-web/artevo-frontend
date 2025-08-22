"use client";

import ArtistUpload from "@/components/ArtistUpload";
import ArtistPrintItemGallery from "@/components/ArtistPrintItemGallery";
import { useState } from "react";

export default function UploadPage() {
    const artistId = 1; // aktuell eingeloggter Artist
    const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Upload / PrintItem erstellen</h1>
            <ArtistUpload artistId={artistId} onSave={() => console.log("Neues PrintItem gespeichert")} />
            <h2 className="text-xl mt-6 mb-2">Bisherige Designs</h2>
            <ArtistPrintItemGallery artistId={artistId} onSelect={(design) => setSelectedDesign(design.id)} />
        </div>
    );
}
