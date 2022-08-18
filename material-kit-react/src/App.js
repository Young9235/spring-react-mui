// routes
import { BaseOptionChartStyle } from 'src/components/chart/BaseOptionChart';
import ScrollToTop from 'src/components/ScrollToTop';
import Router from 'src/routes';
// theme
import ThemeProvider from 'src/theme';
// components

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
