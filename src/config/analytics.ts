import ReactGA from "react-ga4";

// Inicialização do Google Analytics
export const initGA = () => {
  // Substitua 'G-MEASUREMENT_ID' pelo seu próprio ID do Google Analytics
  ReactGA.initialize("G-MEASUREMENT_ID", {
    testMode: process.env.NODE_ENV !== "production",
  });
};

// Rastrear visualizações de página
export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

// Rastrear eventos personalizados
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Rastrear cliques em links externos
export const trackOutboundLink = (url: string, category: string = "Outbound Link") => {
  ReactGA.event({
    category,
    action: "Click",
    label: url,
    transport: "beacon",
  });
};

// Rastrear downloads
export const trackDownload = (fileType: string, fileName: string) => {
  ReactGA.event({
    category: "Download",
    action: fileType,
    label: fileName,
  });
};

// Rastrear erros
export const trackError = (description: string, fatal: boolean = false) => {
  ReactGA.event({
    category: "Error",
    action: description,
    nonInteraction: true,
  });
  
  // If it's a fatal error, we can use ReactGA.exception for GA4
  if (fatal) {
    ReactGA.gtag('event', 'exception', {
      description,
      fatal: fatal, // This works with gtag API
    });
  }
};