import os
import shutil 
import subprocess 
from pathlib import Path
import re 

VUE_PROJECT_DIR = Path("hr-dashboard")
DJANGO_STATIC_TARGET = Path("lms/core/static/hr_dashboard")
VUE_DIST_DIR = VUE_PROJECT_DIR / "dist"
INDEX_FILE = VUE_DIST_DIR / "index.html"
DJANGO_STATIC_PREFIX = "/static/hr_dashboard"

def build_vue_app():
    print("🔧 Building vue app")
    result = subprocess.run(["npm", "run", "build"], cwd=VUE_PROJECT_DIR)
    if result.returncode != 0:
        print("❌ Build failed")
        exit(1)
    print("✅ Build complete")

def copy_files():
    print("📁Copying files...")
    if DJANGO_STATIC_TARGET.exists():
        shutil.rmtree(DJANGO_STATIC_TARGET) # Clear dir
    shutil.copytree(VUE_DIST_DIR, DJANGO_STATIC_TARGET)
    print("✅Files copied to ", DJANGO_STATIC_TARGET)

def fix_index_paths():
    print("🛠️ Fixing paths in index.html")
    index_path = DJANGO_STATIC_TARGET / "index.html"
    content = index_path.read_text()

    content = re.sub(
        r'(["\'(])\/assets/',
        rf'\1{DJANGO_STATIC_PREFIX}/assets/',
        content
    )

    content = re.sub(
        r'(["\'(])\/(?!static)([^"\'\/][^"\')]+?\.(svg|png|jpg|jpeg|ico))',
        rf'\1{DJANGO_STATIC_PREFIX}/\2',
        content
    )

    index_path.write_text(content)
    print("✅ index paths updated")

if __name__ == '__main__':
    build_vue_app()
    copy_files()
    fix_index_paths()
    print("😁 HR dashboard integration successful")