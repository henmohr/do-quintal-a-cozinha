"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import MenuIcon from "@mui/icons-material/Menu";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 gap-4  px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80svh] p-0">
           <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/" onOpenChange={setOpen}>
             Home
            </MobileLink>
          </div>
        </div>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/onde-estamos" onOpenChange={setOpen}>
              Onde Estamos
            </MobileLink>
          </div>
        </div>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/nossas-historias" onOpenChange={setOpen}>
              Nossas Histórias
            </MobileLink>
          </div>
        </div>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/nossa-producao" onOpenChange={setOpen}>
              Nossa Produção
            </MobileLink>
          </div>
        </div>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/nossas-receitas" onOpenChange={setOpen}>
              Nossas Receitas
            </MobileLink>
          </div>
        </div>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/nosso-espaco" onOpenChange={setOpen}>
              Nosso Espaço
            </MobileLink>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-[1.15rem]", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
