# Towards Understanding and Quantifying Uncertainty for Text-to-Image Generation

[![CVPR 2025](https://img.shields.io/badge/CVPR-2025-blue.svg)](https://cvpr.thecvf.com/)
[![ArXiv](https://img.shields.io/badge/ArXiv-2412.03178-red.svg)](https://arxiv.org/abs/2412.03178)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green.svg)](https://github.com/ENSTA-U2IS-AI/Uncertainty_diffusion)

## 📖 Project Overview

This repository contains the **academic website** for our CVPR 2025 paper on uncertainty quantification in text-to-image (T2I) generative models. We introduce **PUNC** (Prompt-based UNCertainty Estimation), a novel method that leverages Large Vision-Language Models (LVLMs) to better address uncertainties arising from the semantics of prompts and generated images.

### 🎯 Key Contributions

- **First work** to quantify and evaluate uncertainty of T2I models with respect to the prompt
- **Novel PUNC method** using LVLMs for semantic uncertainty estimation in text space
- **Uncertainty disentanglement** of aleatoric and epistemic uncertainties via precision and recall
- **Comprehensive dataset** of text prompts and generation pairs for further research
- **Practical applications** in bias detection, copyright protection, and OOD detection

## 🚀 Setup & Usage

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ENSTA-U2IS-AI/Uncertainty_diffusion.git
   cd Uncertainty_diffusion
   ```

## 📚 Research Details

### Authors
- **Gianni Franchi** - ENSTA Paris
- **Nacim Belkhir** - mirai
- **Dat Trong NGUYEN** - ENSTA Paris
- **Guoxuan Xia** - Imperial College London
- **Andrea Pilzer** - NVIDIA

### Citation
```bibtex
@inproceedings{franchi2024uncertainty,
  title={Towards Understanding and Quantifying Uncertainty for Text-to-Image Generation},
  author={Franchi, Gianni and Belkhir, Nacim and Nguyen, Dat Trong and Xia, Guoxuan and Pilzer, Andrea},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  year={2025}
}
```

## 🙏 Acknowledgements

This work was performed using HPC resources from:
- **GENCI-IDRIS** (Grant 2023-[AD011011970R3])
- **EuroHPC Development** access to LEONARDO, hosted by CINECA

### Website Credits
- **Design & Development**: [Nacim Belkhir](https://www.linkedin.com/in/belkhirnacim/)

## 📄 License

This project is open source. Please cite our work if you use this code or website template.

## 🔗 Links

- **📄 Paper**: [ArXiv:2412.03178](https://arxiv.org/abs/2412.03178)
- **💻 Code**: [GitHub Repository](https://github.com/ENSTA-U2IS-AI/Uncertainty_diffusion)
- **🎓 Conference**: [CVPR 2025](https://cvpr.thecvf.com/)

---

*For questions about the research, please contact the authors. For website technical issues, contact [Nacim Belkhir](https://www.linkedin.com/in/belkhirnacim/).*
