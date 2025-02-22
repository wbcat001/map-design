import {NextResponse, NextRequest} from "next/server"   

export async function POST(request: NextRequest) {

    const res = await request.json()
    return NextResponse.json(res, { status: 200 });
}