import argparse
import os
import sys
import time

import numpy as np
import torch
from torch.optim import Adam
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision import transforms

import utils
from transformer_net import TransformerNet
from vgg import Vgg16


def check_paths(args):
    try:
        if not os.path.exists(args.save_model_dir):
            os.makedirs(args.save_model_dir)
        if args.checkpoint_model_dir is not None and not (os.path.exists(args.checkpoint_model_dir)):
            os.makedirs(args.checkpoint_model_dir)
    except OSError as e:
        print(e)
        sys.exit(1)


def stylize(args):
    device = torch.device("cuda" if args.cuda else "cpu")
    file_path = os.path.join(os.getcwd(),args.content_image)
    content_image = utils.load_image(file_path, scale=args.content_scale)
    _, file_name = os.path.split(file_path)
    content_transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Lambda(lambda x: x.mul(255))
    ])
    content_image = content_transform(content_image)
    content_image = content_image.unsqueeze(0).to(device)


    with torch.no_grad():
        style_model = TransformerNet(style_num=args.style_num)
        state_dict = torch.load(os.path.join(os.getcwd(),'neural_style','trained_model','epoch_2_Sun_Jun_12_102348_2022_100000_10000000000.model'))
        style_model.load_state_dict(state_dict)
        style_model.to(device)
        output = style_model(content_image, style_id = [args.style_id]).cpu()

    output_filename='style_'+str(args.style_id)+'_'+file_name
    output_filepath=os.path.join(args.output_image,output_filename)
    utils.save_image(output_filepath, output[0])
    print(output_filename)

def main():
    main_arg_parser = argparse.ArgumentParser(description="parser for fast-neural-style")
    main_arg_parser.add_argument("--content-image", type=str, required=True,
                                 help="path to content image you want to stylize")
    main_arg_parser.add_argument("--content-scale", type=float, default=None,
                                 help="factor for scaling down the content image")
    main_arg_parser.add_argument("--output-image", type=str, default=os.path.join(os.getcwd(),'public','output'),
                                 help="path for saving the output image")
    main_arg_parser.add_argument("--cuda", type=int, default=1,
                                 help="set it to 1 for running on GPU, 0 for CPU")
    main_arg_parser.add_argument("--style-id", type=int, default=0,
                                 help="style number id corresponding to the order in training")
    main_arg_parser.add_argument("--batch-size", type=int, default=4,
                                  help="batch size for testing, default is 4")
    main_arg_parser.add_argument("--style-num", type=int, default=45,
                                  help="number of styles used in training, default is 4")

    args = main_arg_parser.parse_args()

    if args.cuda and not torch.cuda.is_available():
        print("ERROR: cuda is not available, try running on CPU")
        sys.exit(1)

    stylize(args)


if __name__ == "__main__":
    main()
