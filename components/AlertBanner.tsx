/* eslint-disable @next/next/no-html-link-for-pages */

import clsx from "clsx";
import { Container } from "react-bootstrap";

const AlertBanner = ({
  preview,
  loading,
}: {
  preview?: boolean;
  loading?: boolean;
}) => {
  if (!preview) {
    return null;
  }

  return (
    <div className="bg-dark border-bottom border-white text-white">
      <Container>
        <div className={clsx("py-2 text-center")}>
          {loading ? "Loading... " : "This page is a preview. "}
          <a
            className="underline transition-colors duration-200 hover:text-cyan"
            href="/api/exit-preview"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
};
export default AlertBanner;
