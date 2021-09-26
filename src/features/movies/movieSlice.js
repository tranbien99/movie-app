import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import movieApi from '../../common/apis/movieApi'
import {APIKey} from '../../common/apis/movieApiKey'


export const fetchAsyncMovies = createAsyncThunk(
	'movies/fetchAsyncMovies',
	async (term) => {
		const response = await movieApi.get(
			`?apiKey=${APIKey}&s=${term}&type=movie`
		)
		return response.data
	}
)

export const fetchAsyncShows = createAsyncThunk(
	'movies/fetchAsynShows',
	async (term) => {
		const response = await movieApi.get(
			`?apiKey=${APIKey}&s=${term}&type=series`
		)
		return response.data
	}
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
	'movies/AsyncMovieOrShowDetail',
	async (id) => {
		const response = await movieApi.get(
			`?apiKey=${APIKey}&i=${id}&Plot=full`
		)
		return response.data
	}
)

const initialState = {
	movies: {},
	shows: {},
	selectMovieOrShow: {}
}

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addMovies: (state, {payload}) => {
			state.movies = payload;
		},
		removeSelectedMovieOrShow: (state) => {
			state.selectMovieOrShow = {}
		}
	},
	extraReducers: {
		[fetchAsyncMovies.pending]: () => {
			console.log('Pending')
		},
		[fetchAsyncMovies.fulfilled]: (state, {payload}) => {
			console.log('Fetched Successfully')
			return {...state, movies: payload}
		},
		[fetchAsyncMovies.rejected]: () => {
			console.log('Rejected')
		},
		[fetchAsyncShows.pending]: () => {
			console.log('Pending')
		},
		[fetchAsyncShows.fulfilled]: (state, {payload}) => {
			console.log('Fetched Successfully')
			return {...state, shows: payload}
		},
		[fetchAsyncMovieOrShowDetail.pending]: () => {
			console.log('Pending')
		},
		[fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) => {
			console.log('Fetched Successfully')
			return {...state, selectMovieOrShow: payload}
		},
	}
})

export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow

export const {addMovies, removeSelectedMovieOrShow} = movieSlice.actions
export default movieSlice.reducer