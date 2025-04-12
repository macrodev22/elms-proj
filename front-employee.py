import subprocess
from pathlib import Path
import shutil

REACT_PROJECT_DIR = Path("employee-dashboard")
DJANGO_STATIC_TARGET = Path("lms/core/static/employee_dashboard")
REACT_DIST_DIR = REACT_PROJECT_DIR / "dist"

def build_react_app():
    print("🛠️ Building react app")
    result = subprocess.run(["npm", "run", "build"], cwd=REACT_PROJECT_DIR)
    if result.returncode != 0:
        print("❌ Build failed")
        exit(1)
    print("✅ Build successful")

def copy_files():
    print("📁 Copying files...")
    if DJANGO_STATIC_TARGET.exists():
        shutil.rmtree(DJANGO_STATIC_TARGET)
    shutil.copytree(REACT_DIST_DIR, DJANGO_STATIC_TARGET)
    print("✅ Done copying files")

if __name__ == '__main__':
    build_react_app()
    copy_files()