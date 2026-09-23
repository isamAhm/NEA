import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        return NextResponse.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || "0.1.0",
            node: process.version,
            environment: process.env.NODE_ENV || "development",
        });
    } catch (error) {
        console.error("[api/health] Health check failed", error);
        return NextResponse.json(
            { status: "error", error: "Health check failed" },
            { status: 500 }
        );
    }
}