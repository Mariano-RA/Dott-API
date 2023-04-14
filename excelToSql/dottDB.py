import json
import pandas as pd
import sqlite3

# Lectura de datos desde el archivo Excel usando pandas
datos = pd.read_excel("/home/do0t/Documents/ChatGPT/ExcelToSQL/datos.xlsx", sheet_name="Productos")
datosDolar  = pd.read_excel("/home/do0t/Documents/ChatGPT/ExcelToSQL/datos.xlsx", sheet_name="Dolares")

#Creo el archivo JSON y cargo los datos del excel
jsonFIle = open("/home/do0t/Documents/ChatGPT/ExcelToSQL/data.json", "w")
jsonFIle.write(datos.to_json(orient='records'))
jsonFIle.close()

jsonFIle = open("/home/do0t/Documents/ChatGPT/ExcelToSQL/dataDolar.json", "w")
jsonFIle.write(datosDolar.to_json(orient='records'))
jsonFIle.close()

# Nombre del archivo JSON
archivo_json = '/home/do0t/Documents/ChatGPT/ExcelToSQL/data.json'
archivo_json_dolar = '/home/do0t/Documents/ChatGPT/ExcelToSQL/dataDolar.json'

# Nombre de la tabla en la base de datos SQLite
nombre_tabla = 'Productos'
nombre_tabla_2 = 'Dolares'

# Conexión a la base de datos SQLite
conexion = sqlite3.connect('/home/do0t/Documents/ChatGPT/ExcelToSQL/productosDB')

# Creación de la tabla en la base de datos SQLite
cursor = conexion.cursor()
cursor.execute(f'DROP TABLE IF EXISTS {nombre_tabla}')
cursor.execute(f'CREATE TABLE {nombre_tabla} (id integer PRIMARY KEY, proveedor text, producto text, categoria text DEFAULT "Sin categoria", precio float, precioEfectivo float, precioTarjeta float)')
cursor.execute(f'DROP TABLE IF EXISTS {nombre_tabla_2}')
cursor.execute(f'CREATE TABLE {nombre_tabla_2} (id integer PRIMARY KEY AUTOINCREMENT, precioDolar float, precioTarjeta float)')


# Lectura del archivo JSON
with open(archivo_json) as f:
    datos = json.load(f)

with open(archivo_json_dolar) as g:
    datos_dolar = json.load(g)

# Almacenamiento de los datos en la base de datos SQLite
for dato in datos:
    if dato['categoria'] is None:       
        if dato['categoria'] is None:   
            dato["categoria"] = "Sin categoria"
    if dato['precio'] is not None:
        cursor.execute(f"INSERT INTO {nombre_tabla} (id, proveedor, producto, categoria, precio, precioEfectivo, precioTarjeta) VALUES (?, ?, ?,?, ?, ?, ?)", (dato['id'], dato['proveedor'], dato['producto'], dato['categoria'], dato['precio'], dato['precioEfectivo'], dato['precioTarjeta']))

for dato in datos_dolar:
    cursor.execute(f"INSERT INTO {nombre_tabla_2} ( precioDolar, precioTarjeta) VALUES ( ?, ?)", (dato['precioDolar'], dato['precioTarjeta']))


                   

# Confirmación de los cambios y cierre de la conexión a la base de datos
conexion.commit()
conexion.close()