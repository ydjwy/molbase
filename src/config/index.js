import {ANT_API_SIZE} from "./constant";

export const defaultPagination = {
  size: ANT_API_SIZE,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共 ${total} 条数据`,
  pageSizeOptions: ['30', '50', '100'],
  defaultPageSize: 30
};

export const defaultModelProps = {
  okText: '保存',
  okButtonProps: {size: ANT_API_SIZE},
  cancelText: '取消',
  cancelButtonProps: {size: ANT_API_SIZE}
};
