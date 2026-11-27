import { NextRequest,NextResponse } from "next/server";
import { mkdir,readFile,writeFile } from "node:fs/promises";
import path from "node:path";
export const runtime="nodejs";
const file=path.join(process.cwd(),"runtime-data","announcer-state.json");
async function read(){try{return JSON.parse(await readFile(file,"utf8")) as {ids:string[];overrides:Record<string,string>}}catch{return {ids:[],overrides:{}}}}
function roleOf(req:NextRequest){const [role,expiry]=req.cookies.get("conso_role")?.value?.split(":")||[];return Number(expiry)>Date.now()?role:null}
export async function GET(req:NextRequest){if(!roleOf(req))return NextResponse.json({error:"Sign in required"},{status:401});const state=await read();return NextResponse.json(state)}
export async function POST(req:NextRequest){if(roleOf(req)!=="admin")return NextResponse.json({error:"Admin access required"},{status:403});const body=await req.json();if(!Array.isArray(body.ids)||body.ids.length>20||body.ids.some((x:unknown)=>typeof x!=="string")||!body.overrides||typeof body.overrides!=="object")return NextResponse.json({error:"Invalid selection"},{status:400});await mkdir(path.dirname(file),{recursive:true});const state={ids:body.ids as string[],overrides:body.overrides as Record<string,string>};await writeFile(file,JSON.stringify(state),"utf8");return NextResponse.json(state)}
