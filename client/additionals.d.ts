interface Env {
	API_URL: string;
}

// eslint-disable-next-line
namespace NodeJS {
	// eslint-disable-next-line
	interface ProcessEnv extends Env {}
}
