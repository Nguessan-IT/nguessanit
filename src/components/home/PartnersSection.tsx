import * as React from "react";

type Partner = {
  id: string;
  name: string;
  logo_url: string;
};

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  if (!partners?.length) return null;

  return (
    <section className="py-12 border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Ils nous font confiance
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="w-full max-w-[170px] flex items-center justify-center"
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-11 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${partner.name}&background=random&color=fff&size=128`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
