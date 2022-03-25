import React, { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.querySelector("#root");
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error<h4>' + err + '</div>';
          throw err
        }
      }, false);
    </script>
  </body>
</html>
`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframe}
      title="code preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};
