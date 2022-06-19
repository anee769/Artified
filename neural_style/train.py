import numpy as np 
import cv2
import os
import argparse

def stylize(args):
    file_path=os.path.join(os.getcwd(),args.content_image)
    _, file_name = os.path.split(file_path)
    img=cv2.imread(file_path)
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    output_filepath=args.output_image+'/style_'+str(args.style_id)+'_'+file_name
    cv2.imwrite(output_filepath, grayImage)
    print(output_filepath)

def main():
    main_arg_parser = argparse.ArgumentParser(description="parser for fast-neural-style")
    main_arg_parser.add_argument("--content-image", type=str, required=True,
                                 help="path to content image you want to stylize")
    main_arg_parser.add_argument("--output-image", type=str, default=os.path.join(os.getcwd(),'public','output'),
                                 help="path for saving the output image")
    main_arg_parser.add_argument("--style-id", type=int, default=0,
                                 help="style number id corresponding to the order in training")

    args = main_arg_parser.parse_args()

    stylize(args)

if __name__ == "__main__":
    main()