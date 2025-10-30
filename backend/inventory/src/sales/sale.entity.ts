import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'producto_id' })
  producto: Inventory;

  @Column()
  producto_id: number;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ length: 50 })
  usuario: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @Column({ type: 'varchar', length: 100 })
  cliente_nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cliente_email: string | null;

  @Column({ type: 'varchar', length: 15, nullable: true })
  cliente_telefono: string | null;

  @Column({ type: 'text', nullable: true })
  cliente_direccion: string | null;
}
