export const fetcher = async (
  query: string,
  variables?: object,
  options?: { credentials: string }
) => {
  try {
    const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string;

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options?.credentials}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const result = await request.json();
    if (result?.errors?.length > 0) {
      throw new Error(result.errors[0].message);
    }
    return result;
  } catch (error) {
    throw error;
  }
};
