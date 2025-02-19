"use client";

import { getImageByOffset } from "@/API/unspalsh";
import { TGalleryItem } from "@/lib/types";
import { Level } from "level";
import { NextResponse } from "next/server";

export async function GET() {
    const db = new Level<string, TGalleryItem[]>("./db", {valueEncoding: "json"});

    let images :TGalleryItem[];


    images = await db.get("images");

    if (images.length < 30) {
        for (let i = 0; i < 3; i++) {
            await getImageByOffset(i)
                .then((res) => {
                    images = images.concat(res.data);
                });
        }
        await db.put("images", images);
    }

    return NextResponse.json(images);
}