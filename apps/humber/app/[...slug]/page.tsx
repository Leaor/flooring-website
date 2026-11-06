import config from '../../site.config';
import { ContentPage, metadataFor } from '../../../../packages/site/src/pages';
type Props = {params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props) { return metadataFor(config,(await params).slug); }
export default async function Page({params}:Props) { return <ContentPage config={config} slug={(await params).slug}/>; }
