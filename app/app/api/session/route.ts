import {NextRequest,NextResponse} from "next/server";
export async function GET(req:NextRequest){const value=req.cookies.get("conso_role")?.value;const [role,expiry]=value?.split(":")||[];if(!role||Number(expiry)<Date.now())return NextResponse.json({error:"Expired"},{status:401});return NextResponse.json({role})}
