import type { $Fetch } from '@fc/types/nitropack';
import { $fetch } from '@fc/composables/useNuxtShims';

export type LegalCdnTokenResponse = {
  status?: string;
  token?: string;
  uploadUrl?: string;
};

export type LegalCdnUploadResponse = {
  success?: Array<{
    path: string;
    url?: string;
  }>;
  failure?: string[];
};

export class LegalCdnRepository {
  private readonly fetch: $Fetch;

  constructor(fetch: $Fetch) {
    this.fetch = fetch;
  }

  getToken(source: string): Promise<LegalCdnTokenResponse> {
    const body = new FormData();
    body.append('source', source);

    return this.fetch('/legalcdn/token/', {
      method: 'POST',
      body,
      ignoreResponseError: true,
      credentials: 'include',
    });
  }

  uploadFile(params: { file: File; uploadUrl: string; token: string }): Promise<LegalCdnUploadResponse> {
    const { file, uploadUrl, token } = params;

    // IMPORTANT: uploadUrl comes from /legalcdn/token/ response and must be used as-is.
    // Do not use appFetch instance here, because it injects Symfony headers that may break LegalCDN upload.
    const fd = new FormData();
    fd.append('file[]', file);

    return $fetch(uploadUrl, {
      method: 'POST',
      body: fd,
      ignoreResponseError: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
