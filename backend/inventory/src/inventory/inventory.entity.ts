import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @Column()
  usuario: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  fecha: Date;
}
