"use client";

import { motion } from "framer-motion";
import { Cover } from "@/components/sections/Cover";
import { PBL } from "@/components/sections/PBL";
import { Conferences } from "@/components/sections/Conferences";
import { Disciplines } from "@/components/sections/Disciplines";
import { NCS } from "@/components/sections/NCS";
import { HM } from "@/components/sections/HM";
import { PMSUS } from "@/components/sections/PMSUS";
import { Metodologia } from "@/components/sections/Metodologia";
import { Evaluations } from "@/components/sections/Evaluations";
import { Results } from "@/components/sections/Results";
import { Materials } from "@/components/sections/Materials";
import { Schedule } from "@/components/sections/Schedule";
import { Trotes } from "@/components/sections/Trotes";
import { Dipiroma } from "@/components/sections/Dipiroma";
import { Comissao } from "@/components/sections/Comissao";
import { Ligas } from "@/components/sections/Ligas";
import { AAAMUPB } from "@/components/sections/AAAMUPB";
import { CAMC } from "@/components/sections/CAMC";
import { Voluntariado } from "@/components/sections/Voluntariado";
import { Final } from "@/components/sections/Final";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-neutral-dark text-primary-light">
      <Header />
      <div id="top" />

      {/* Mobile-on-Desktop Container */}
      <div className="w-full md:max-w-md md:mx-auto bg-neutral-dark md:shadow-[0_0_50px_rgba(0,0,0,0.5)] md:min-h-screen">
        <Cover />
        <div id="pbl"><PBL /></div>
        <div id="conferencias"><Conferences /></div>
        <div id="disciplinas"><Disciplines /></div>
        <div id="ncs"><NCS /></div>
        <div id="hm"><HM /></div>
        <div id="pmsus"><PMSUS /></div>
        <div id="metodologia"><Metodologia /></div>
        <div id="avaliacoes"><Evaluations /></div>
        <div id="resultados"><Results /></div>
        <div id="materiais"><Materials /></div>
        <div id="horarios"><Schedule /></div>
        <div id="trotes"><Trotes /></div>
        <div id="dipiroma"><Dipiroma /></div>
        <div id="comissao"><Comissao /></div>
        <div id="ligas"><Ligas /></div>
        <div id="camc"><CAMC /></div>
        <div id="voluntariado"><Voluntariado /></div>
        <div id="aaamupb"><AAAMUPB /></div>
        <Final />
      </div>
      <ScrollToTop />
    </main>
  );
}
