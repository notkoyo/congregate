"use client";

import { GoogleMap } from "@/components/Maps/GoogleMap";
import { GoogleMapAutocomplete } from "@/components/Maps/GoogleMapAutocomplete";
import { useState } from "react";

export default function Home() {
  const [selectedPos, setSelectedPos] = useState({});

  return (
    <div className="m-4 mt-8">
      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-2" >
          <GoogleMap selectedPos={selectedPos} />
          <GoogleMapAutocomplete setSelectedPos={setSelectedPos} />
        </section>
        <section>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
          <div>fill</div>
        </section>
      </div>
    </div>
  );
}
