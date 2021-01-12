/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import axios from 'axios';
import { TemplateManagementError } from '../common/errors/template-management-error';

export async function getRequest(url: string, params: object = {}) {
	try {
		const response = await axios.get(url, params);
		return response;
	} catch (error) {
		throw new TemplateManagementError(error);
	}
}
export async function getToken(url: string) {
	const response = await getRequest(url);
	return response.data.access_token;
}

export async function getAcrTags(url: string, token: string) {
	const params = {
		headers : {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await getRequest(url, params);
	const tags = response.data.tags;
	const tagList = [];
	if (!tags) {
		return tagList;
	}
	for (let i = 0; i < tags.length; i++) {
		tagList.push(tags[i].name);
	}
	return tagList.reverse();
}
