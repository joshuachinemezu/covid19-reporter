import http from './http'

export async function fetchGlobalCount() {
	return http.get(`/global/count`)
}

export async function fetchAffectedCountriesDetailed() {
	return http.get(`/global/affected/stats`)
}
