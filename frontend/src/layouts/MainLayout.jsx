//

import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Typography, CssBaseline, Box, Breadcrumbs, Link } from "@mui/joy";
import {
  X as XIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  CalendarMonth,
} from "@mui/icons-material";

import { Sidebar, Header } from "../components";
import { Outlet, useLocation } from "react-router-dom";

const breadcrumbsMap = {
  twitter: <XIcon />,
  scheduler: "Scheduler",
  "ai-bot": "AI-Bot",
};

const MainLayout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          {pathnames.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography
                      color="primary"
                      fontWeight={500}
                      fontSize={12}
                      key={value}
                    >
                      {breadcrumbsMap[value]}
                    </Typography>
                  ) : (
                    <>
                      <Link
                        underline="none"
                        color="neutral"
                        href="#some-link"
                        aria-label="Home"
                        key={value}
                      >
                        {breadcrumbsMap[value]}
                      </Link>
                    </>
                  );
                })}
              </Breadcrumbs>
            </Box>
          )}
          <Outlet />
          {/* <OrderTable /> */}
          {/* <OrderList /> */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default MainLayout;
