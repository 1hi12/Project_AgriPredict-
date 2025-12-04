import React, { useEffect } from 'react';
import * as powerbi from 'powerbi-client';

function PowerBIEmbed() {
  useEffect(() => {
    const embedConfig = {
      type: 'report',
      id: 'your-report-id',
      embedUrl: 'https://app.powerbi.com/reportEmbed?...',
      accessToken: 'your-access-token',
      tokenType: powerbi.models.TokenType.Aad,
      settings: {
        panes: {
          filters: { visible: false },
          pageNavigation: { visible: false },
        },
      },
    };
     // <PowerBIEmbed />
<div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
  <p>Power BI Placeholder</p>
</div>
    const reportContainer = document.getElementById('powerbi-report');
    const report = powerbi.embed(reportContainer, embedConfig);

    return () => powerbi.reset(reportContainer);
  }, []);

  return <div id="powerbi-report" className="w-full h-96" />;
}

export default PowerBIEmbed;