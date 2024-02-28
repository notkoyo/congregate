"use client";

import Heading from "@/components/Header";
import { Events } from "../../components/Events/Events";

export default function Meet() {
  return (
    <>
      <Heading heading="Events near you! &#128131; " />
      <Events />
    </>
  );
}
