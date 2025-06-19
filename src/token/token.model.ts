import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  BeforeCreate,
  BeforeSave,
  BeforeValidate,
} from 'sequelize-typescript';
import * as crypto from 'crypto';

@Table({
  tableName: 'tokens',
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'modified',
  paranoid: true,
  deletedAt: 'deleted',
})
export default class Token extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.DOUBLE)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare value: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare userId: string;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  declare generatedBy: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Column(DataType.DATE)
  declare expirationDate: Date;

  @BeforeValidate
  static generateTokenValueAndExpiry(instance: Token) {
    console.log('-----------------------------------------------------');
    instance.value = crypto.randomBytes(16).toString('hex');
    instance.expirationDate = Token.addHours(24);
    console.log('🧪 Token generated:', instance.value);
  }

  static addHours(numOfHours: number, date: Date = new Date()): Date {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  isValid(): boolean {
    return this.active && this.expirationDate > new Date();
  }

  async useToken(): Promise<this | null> {
    if (this.isValid()) {
      this.active = false;
      await this.save();
      return this;
    }
    return null;
  }
}
