import config from '../../../site.config';
import { handleEstimate } from '../../../../../packages/site/src/estimate';
export const runtime = 'nodejs';
export async function POST(request:Request) { return handleEstimate(request,config); }
