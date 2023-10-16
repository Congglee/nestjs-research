import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 33061,
  username: 'root',
  password: 'root',
  database: 'blog-nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

// File chứa các cài đặt cấu hình cho kết nối cơ sở dữ liệu.

// Chỉ định ứng dụng sẽ kết nối với cơ sở dữ liệu MySQL chạy trên localhost tại cổng 33061
// Thông tin xác thực cơ sở dữ liệu (database credentials) được cung cấp(username và password), cùng với tên của cơ sở dữ liệu(blog - nestjs)
// Chỉ định các thực thể và đường dẫn migrations.
// Các thực thể thường là các class đại diện cho các bảng cơ sở dữ liệu và việc migration được sử dụng để quản lý các thay đổi về schema của cơ sở dữ liệu.
// Trong trường hợp này, TypeORM sẽ tìm kiếm các tệp thực thể và migration trong thư mục dist.
// synchronize (đồng bộ hóa) được đặt thành false, có nghĩa là TypeORM sẽ không tự động tạo và áp dụng các thay đổi vào schema của cơ sở dữ liệu. Chúng ta sẽ cần phải thực hiện migration theo cách thủ công.

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
