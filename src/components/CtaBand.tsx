import { ButtonLink } from "@/components/ui/Button";
import { SOCIAL } from "@/lib/contact";

/** Closing call to action on Home, Services and Work */
export function CtaBand() {
  return (
    <section className="border-t border-line">
      <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-8">
          <p className="label">Start a project</p>
          <h2 className="mt-5 max-w-[20ch] font-serif text-[36px] font-normal leading-[1.06] tracking-[-0.015em] md:text-[52px]">
            Tell us what&apos;s slowing your business down.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] md:text-[18px]">
            Book a free call. We&apos;ll tell you honestly whether software can fix it, and what it would take.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3 md:col-span-4 md:justify-end">
          <ButtonLink href="/contact">Book a free call</ButtonLink>
          <ButtonLink href={SOCIAL.whatsapp} external variant="secondary">
            WhatsApp us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
