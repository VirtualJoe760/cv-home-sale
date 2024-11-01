import Script from "next/script";
import { useEffect } from "react";

const QuickSearchForm = () => {
  useEffect(() => {
    const quickSearchDiv = document.createElement("div");
    quickSearchDiv.id = "MBBv3_QuickSearch";
    quickSearchDiv.setAttribute("filter", "formType:simple1");

    document.getElementById("quick-search-widget")?.appendChild(quickSearchDiv);
  }, []);

  return (
    <div>
      <Script src="https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz" strategy="beforeInteractive" />
      <div id="quick-search-widget"></div>
    </div>
  );
};

export default QuickSearchForm;
