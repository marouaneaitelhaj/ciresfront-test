import { getImageByOffset } from "@/API/unspalsh";
import { TGalleryItem } from "@/lib/types";
import { Level } from "level";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const db = new Level<string, any>("./db", {valueEncoding: "json"});


    let images :TGalleryItem[];


    try{
        images = await db.get("images");
    }catch( error ){
        images = [];
    }
    if(images.length < 30){
        await getImageByOffset(request.nextUrl.searchParams.get("offset") as number)
    }
}