"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageLightbox } from "@/components/image-lightbox";
import Image from "next/image";
import { Story } from "@/types/story";
import { notFound } from "next/navigation";


interface StoryDetailProps {
  story: Story | null | undefined;
    isLoading: boolean;
}

export function StoryDetail({ story, isLoading }: StoryDetailProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (isLoading) {
    return <p>Carregando...</p>;
    }
    if (!story) {
    return notFound();
    }

    return (
    <main className="container-wrapper">
      <div className="container flex flex-col gap-6">
        <Card className="overflow-hidden">
          <button
            onClick={() => setLightboxOpen(true)}
            className="relative h-64 md:h-96 w-full cursor-zoom-in group"
            aria-label="Ver imagem em tamanho completo"
          >
            {story.media.length > 0 && (
              <Image
                src={story.media[0].media.url}
                alt={story.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </button>
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-4">{story.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{story.description}</p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </CardContent>
        </Card>
      </div>

      {story.media.length > 0 && (
        <ImageLightbox
          images={[
            {
              url: story.media[0].media.url,
              alt: story.name,
            },
          ]}
          initialIndex={0}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}  
