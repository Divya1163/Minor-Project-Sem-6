import pandas as pd
import os

# ==============================
# STEP 1: LOAD DATA
# ==============================
df = pd.read_csv("india_data.csv", low_memory=False)

print("Original shape:", df.shape)

# ==============================
# STEP 2: SELECT IMPORTANT COLUMNS
# ==============================
df = df[['Air temperature (C)',
         'Relative humidity (%)',
         'Air velocity (m/s)',
         'Met',
         'Clo',
         'Thermal sensation']]

# Rename for simplicity
df.columns = ['ta', 'rh', 'v', 'met', 'clo', 'thermal_sensation']

# ==============================
# STEP 3: DROP MISSING & INVALID VALUES
# ==============================
df = df.dropna()

# Remove unrealistic values
df = df[(df['ta'] > 0) & (df['ta'] < 60)]
df = df[(df['rh'] >= 0) & (df['rh'] <= 100)]
df = df[(df['v'] >= 0) & (df['v'] <= 5)]
df = df[(df['met'] > 0) & (df['met'] < 5)]
df = df[(df['clo'] >= 0) & (df['clo'] < 3)]
df = df[(df['thermal_sensation'] >= -3) & (df['thermal_sensation'] <= 3)]

print("After cleaning shape:", df.shape)

# ==============================
# STEP 4: REDUCE MEMORY USAGE
# ==============================
df['ta'] = df['ta'].astype('float32')
df['rh'] = df['rh'].astype('float32')
df['v'] = df['v'].astype('float32')
df['met'] = df['met'].astype('float32')
df['clo'] = df['clo'].astype('float32')
df['thermal_sensation'] = df['thermal_sensation'].astype('int8')

# ==============================
# STEP 5: REDUCE FILE SIZE (IF STILL LARGE)
# ==============================
# Keep only 150000 rows (adjust if needed)
MAX_ROWS = 150000  

if len(df) > MAX_ROWS:
    df = df.sample(n=MAX_ROWS, random_state=42)
    print("Data sampled to reduce file size")

# ==============================
# STEP 6: SAVE CLEANED FILE
# ==============================
save_path = r"C:\Users\rajde\OneDrive\Desktop\projexa\india_data_cleaned.csv"

df.to_csv(save_path, index=False)

# ==============================
# STEP 7: CHECK FILE SIZE
# ==============================
file_size_mb = os.path.getsize(save_path) / (1024 * 1024)

print("Saved file:", save_path)
print(f"File size: {file_size_mb:.2f} MB")
