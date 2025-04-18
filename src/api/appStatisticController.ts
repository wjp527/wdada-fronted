// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** doAppAnswerCount GET /api/statistic/answer_count */
export async function doAppAnswerCountUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListAppAnswerCountDTO_>(
    "/api/statistic/answer_count",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** doAppAnswerResultCount GET /api/statistic/answer_result_count */
export async function doAppAnswerResultCountUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doAppAnswerResultCountUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListAppAnswerResultCountDTO_>(
    "/api/statistic/answer_result_count",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
