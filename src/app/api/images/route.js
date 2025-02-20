// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getImageByOffset } = require("@/API/unspalsh");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Level } = require("level");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NextResponse } = require("next/server");

export async function GET() {
    const db = new Level("my-database", { valueEncoding: "json" });

    let images;

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
