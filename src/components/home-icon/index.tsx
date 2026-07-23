import Image from "next/image";

interface HomeIconProps {
  title: string;
  illustrationSrc: string;
}



export function HomeIcon({title, illustrationSrc}: HomeIconProps) {
  return (
    <div className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <Image
        src={illustrationSrc}
        alt={title}
        width={112}
        height={112}
        className="group-hover:scale-105 transition-transform duration-300"
      />
      <span className="group-hover:text-primary transition-colors">{title}</span>
    </div>
  )
}
