import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '../../../packages/site/src/globals.css';
import '../brand.css';
import { Shell } from '../../../packages/site/src/Shell';
import { StructuredData, metadataFor } from '../../../packages/site/src/pages';
import config from '../site.config';
export const dynamic = 'force-dynamic';
export const generateMetadata = () => metadataFor(config);
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en-CA"><body data-brand={config.id}><StructuredData config={config}/><Shell config={config}>{children}</Shell></body></html>; }
