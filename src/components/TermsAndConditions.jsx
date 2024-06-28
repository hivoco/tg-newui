import { useRef, useEffect } from "react";
import CloudPdfViewer from "@cloudpdf/viewer";

export default function TermsAndConditions() {
  const viewer = useRef(null);
  useEffect(() => {
    CloudPdfViewer(
      {
        documentId: "68938d09-3a82-4951-8f41-7124aff87b48",
        darkMode: true,
      },
      viewer.current
    ).then((instance) => {});
  }, []);
  return (
    <div className="app">
      <div className="viewer h-screen" ref={viewer}></div>
    </div>
  );
}
