import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";
import { Category, MediaType } from "@prisma/client";

interface MediaItem {
  url: string;
  media_type: MediaType;
}

export async function POST(request: Request) {
  const body = await request.json();

  // Normalize empty strings to undefined (handles Typebot variables that aren't set)
  const productName = body.product_name?.trim() || undefined;
  const phoneNumber = body.phone_number?.trim() || undefined;
  const category = body.category?.trim() || undefined;
  const media: MediaItem[] = body.media || [];
  const price = body.price !== undefined && body.price !== null && body.price !== ""
    ? Number(body.price)
    : null;

  // Validate required fields
  if (!productName) {
    return new Response(JSON.stringify({ error: "Product name is required" }), {
      status: 400,
    });
  }

  if (!phoneNumber) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  if (!category) {
    return new Response(JSON.stringify({ error: "Category is required" }), {
      status: 400,
    });
  }

  if (
    category !== Category.AGRICOLA &&
    category !== Category.ARTESANATO &&
    category !== Category.PROCESSADO
  ) {
    return new Response(
      JSON.stringify({
        error: `Category must be one of "${Category.AGRICOLA}", "${Category.ARTESANATO}", "${Category.PROCESSADO}"`,
      }),
      { status: 400 }
    );
  }

  // Validate price if provided
  if (price !== null && (isNaN(price) || price < 0)) {
    return new Response(
      JSON.stringify({ error: "Price must be a positive number" }),
      { status: 400 }
    );
  }

  // Filter out media items with empty URLs and validate remaining items
  const validMedia = media.filter(item => {
    // Skip items with empty/missing URLs
    if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
      return false;
    }
    return true;
  });

  // Validate media_type for remaining items
  for (let i = 0; i < validMedia.length; i++) {
    const item = validMedia[i];

    if (!item.media_type) {
      return new Response(
        JSON.stringify({ error: `Media item at index ${i}: media_type is required` }),
        { status: 400 }
      );
    }

    if (
      item.media_type !== MediaType.IMAGE &&
      item.media_type !== MediaType.AUDIO &&
      item.media_type !== MediaType.VIDEO
    ) {
      return new Response(
        JSON.stringify({
          error: `Media item at index ${i}: media_type must be one of "${MediaType.IMAGE}", "${MediaType.AUDIO}", "${MediaType.VIDEO}"`,
        }),
        { status: 400 }
      );
    }
  }

  // Verify profile exists
  const profile = await prisma.profile.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });

  if (!profile) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
    });
  }

  try {
    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Create product
      const newProduct = await tx.product.create({
        data: {
          id: uuidv4(),
          category,
          description: body.description || null,
          price,
          product_name: productName,
          profile_id: profile.id,
        },
      });

      // Create media entries if provided
      const createdMedia = [];
      for (const mediaItem of validMedia) {
        const newMedia = await tx.media.create({
          data: {
            id: uuidv4(),
            url: mediaItem.url,
            media_type: mediaItem.media_type,
          },
        });

        // Link media to product via junction table
        await tx.productMedia.create({
          data: {
            productId: newProduct.id,
            mediaId: newMedia.id,
          },
        });

        createdMedia.push(newMedia);
      }

      return {
        product: newProduct,
        media: createdMedia,
      };
    });

    return new Response(
      JSON.stringify({
        message: "Product created successfully",
        data: {
          ...result.product,
          media: result.media,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create product. Transaction rolled back." }),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const phone_number = searchParams.get("phone_number");
  const product_id = searchParams.get("product_id");

  if (!phone_number && !product_id) {
    return new Response(
      JSON.stringify({
        error:
          "Enter at least one of the attributes between phone_number and product_id in search params.",
      }),
      { status: 400 }
    );
  }

  if (phone_number) {
    const products = await prisma.product.findMany({
      where: { profile: { phone_number } },
      select: {
        id: true,
        product_name: true,
        description: true,
        price: true,
        category: true,
        profile_id: true,
        media: true
      }
    });

    return new Response(JSON.stringify({ data: products }), { status: 200 });
  }

  const product = await prisma.product.findUnique({
    select: {
      id: true,
      product_name: true,
      description: true,
      price: true,
      category: true,
      profile_id: true,
      media: true
    },
    where: { id: product_id as string },
  });

  return new Response(JSON.stringify({ data: product }), { status: 200 });
}
