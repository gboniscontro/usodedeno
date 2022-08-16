//import * as mod from "https://deno.land/std@0.152.0/fmt/colors.ts";
import { serve } from "https://deno.land/std@0.152.0/http/mod.ts";

localStorage.clear();

localStorage.setItem("curso", "backend");

let colores: string[] = [];
if (localStorage.getItem("colores")) {
  colores = JSON.parse(localStorage.getItem("colores") || "");
}

const requestHandler = (req) => {
  const { pathname } = new URL(req.url);

  switch (pathname) {
    case "/":
      return new Response("Hello from /");
    case "/addcolor": {
      const url = new URL(req.url);
      const q = url.searchParams.get("name");
      colores.push(q);
      localStorage.setItem("colores", JSON.stringify(colores));
      return new Response(JSON.stringify(colores));
    }
    case "/getallcolors": {
      return new Response(JSON.stringify(colores));
    }
    default:
      return new Response("Ruta no valida");
  }
};
serve(requestHandler, { port: 8080 });
