#!/usr/bin/env python
"""CLI Script to train all Zenve BI AI models.

Usage:
    # 1. Train on existing project data (SQLite zenvebi.db or MySQL zenve_engine):
    python train_models.py

    # 2. Train on custom/original data from a CSV directory:
    python train_models.py --data-dir ./original_data

    # 3. Specify custom artifact output path:
    python train_models.py --output-dir ./artifacts
"""
import argparse
import sys
from pathlib import Path

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app.ml.train_all import train_all_models


def main():
    parser = argparse.ArgumentParser(description="Train Zenve BI AI Models on current or original data.")
    parser.add_argument(
        "--data-dir",
        type=str,
        default=None,
        help="Optional directory containing original sales.csv, customers.csv, inventory.csv",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=None,
        help="Optional custom output directory for saved .joblib model artifacts",
    )
    args = parser.parse_args()

    print("=====================================================================")
    print("  ZENVE INTELLIGENCE ENGINE — AI/ML MODEL TRAINING PIPELINE")
    print("=====================================================================")
    if args.data_dir:
        print(f"[*] Training Source: External original CSV directory ({args.data_dir})")
    else:
        print("[*] Training Source: Active Project Database (SQLite/MySQL)")

    results = train_all_models(
        csv_dir=args.data_dir,
        artifacts_dir=args.output_dir,
    )
    print("\nTraining Summary:")
    for name, info in results.get("models", {}).items():
        print(f"  • {name}: {info['algorithm']} -> {info['artifact']}")
        print(f"    Metrics: {info['metrics']}")
    print("=====================================================================")


if __name__ == "__main__":
    main()
