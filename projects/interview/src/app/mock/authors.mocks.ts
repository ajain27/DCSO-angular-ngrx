/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { AuthorSearchRequest, AuthorSearchStringQuery } from '@requests/author-search.request';
import { DsRequestResponse } from '@utils/request';
import { generateMockBooksAndAuthors } from './db/author.db';
import { getMockAuthors } from './db/author.db';
import { Mock } from './mock';

generateMockBooksAndAuthors();

/**
 * Note: Mocks don't become active until they are registered in mock.http-interceptor.ts
 * registerMockClass(AuthorsMocks);
 */
export class AuthorsMocks {
  @Mock(AuthorSearchRequest)
  mockAuthorSearchRequest(request: AuthorSearchRequest): DsRequestResponse<AuthorSearchRequest> {
    // TODO: Don't assume the request is always a string query
    const body = request.body as AuthorSearchStringQuery;

    const query = body.query.toLowerCase();
    const authors = getMockAuthors().filter(author => author.firstName.toLowerCase().includes(query) || author.lastName?.toLowerCase()?.includes(query));
    console.log(authors);
    return {
      success: true,
      authors
    };
  }
}
