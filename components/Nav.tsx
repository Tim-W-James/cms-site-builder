import clsx from "clsx";
import { Routes } from "lib/sanity.queries";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const Navigation = ({ routes }: { routes: Routes }) => {
  const router = useRouter();
  return (
    <Nav className={clsx("pt-1 px-1")} variant="tabs">
      <Nav.Item>
        <Nav.Link
          active={router.asPath === "/" || router.pathname === "/"}
          as={Link}
          href="/"
        >
          Home
        </Nav.Link>
      </Nav.Item>
      {routes.items?.map((route, index) =>
        route.routes ? (
          route.routes.length === 1 ? (
            <Nav.Item key={index}>
              <Nav.Link
                active={router.asPath === `/${route.routes[0].path ?? ""}`}
                as={Link}
                href={route.routes[0].path}
              >
                {route.title ?? "Untitled"}
              </Nav.Link>
            </Nav.Item>
          ) : (
            <NavDropdown
              active={route.routes
                .map((route) => `/${route.path ?? ""}`)
                .includes(router.asPath)}
              key={index}
              title={route.title ?? "Untitled"}
            >
              {route.routes.map((subItem, index) => (
                <NavDropdown.Item
                  active={router.asPath === `/${subItem.path ?? ""}`}
                  as={Link}
                  href={subItem.path}
                  key={index}
                >
                  {subItem.title ?? "Untitled"}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          )
        ) : null
      )}
    </Nav>
  );
};
export default Navigation;
