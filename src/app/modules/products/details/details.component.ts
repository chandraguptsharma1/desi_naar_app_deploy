import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @ViewChild('mainImg') mainImg!: ElementRef;
  
  productData: any;
  product: any;
  isFabricOpen: boolean = true;
  isDescriptionOpen: boolean = true;
  isDeliveryOpen: boolean = true;
  mainImage: string = '';
  detailImages: string[] = [];
  isZoomed: boolean = false;
  zoomPosition = { x: 0, y: 0 };
  zoomStyle = {};
  zoomScale = 2.5;
  videoUrl: SafeResourceUrl | null = null;
  showVideo: boolean = false;

  constructor(
    private productServices: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.productData = sessionStorage.getItem('selectedProduct');
    console.log("product data ",this.productData)
    if (this.productData) {
      this.product = JSON.parse(this.productData);
      
      // Set main image from imageUrls
      if (this.product.imageUrls && this.product.imageUrls.length > 0) {
        this.mainImage = this.product.imageUrls[0];
      }
      
      // Handle detail images separately
      if (this.product.detailImages && this.product.detailImages.length > 0) {
        // Sort detail images based on sequence number in filename
        this.detailImages = [...this.product.detailImages].sort((a, b) => {
          const getSequenceNumber = (url: string) => {
            const match = url.match(/(\d+)(?=[^/]*$)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getSequenceNumber(a) - getSequenceNumber(b);
        });
      }
      
      // Filter out any undefined images
      this.detailImages = this.detailImages.filter(img => img);

      // Handle video URL
      if (this.product.videoUrl) {
        const videoId = this.extractGoogleDriveFileId(this.product.videoUrl);
        if (videoId) {
          const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      }
    }
  }

  extractGoogleDriveFileId(url: string): string | null {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : null;
  }

  setMainImage(image: string) {
    this.mainImage = image;
    this.showVideo = false;
  }

  showVideoPlayer() {
    this.showVideo = true;
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.isZoomed) return;

    const img = this.mainImg.nativeElement;
    const rect = img.getBoundingClientRect();
    
    // Calculate cursor position relative to image
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate zoom window position
    const zoomWindowWidth = 150;
    const zoomWindowHeight = 150;
    
    // Position zoom window relative to cursor
    let zoomX = x - zoomWindowWidth / 2;
    let zoomY = y - zoomWindowHeight / 2;

    // Keep zoom window inside image bounds
    zoomX = Math.max(0, Math.min(zoomX, rect.width - zoomWindowWidth));
    zoomY = Math.max(0, Math.min(zoomY, rect.height - zoomWindowHeight));

    // Calculate background position for zoomed image
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    this.zoomPosition = { x: zoomX, y: zoomY };
    this.zoomStyle = {
      transform: `translate(${zoomX}px, ${zoomY}px)`,
      backgroundImage: `url(${this.mainImage})`,
      backgroundPosition: `${bgX}% ${bgY}%`,
      backgroundSize: `${this.zoomScale * 100}%`,
    };
  }

  handleMouseEnter() {
    this.isZoomed = true;
  }

  handleMouseLeave() {
    this.isZoomed = false;
  }

  quantity = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  isOpen: Record<
    'description' | 'extraDetails' | 'visitStore' | 'additionalInfo',
    boolean
  > = {
    description: true,
    extraDetails: false,
    visitStore: false,
    additionalInfo: false,
  };

  toggleSection(section: keyof typeof this.isOpen) {
    this.isOpen[section] = !this.isOpen[section];
  }

  recommendedProducts = [
    {
      name: 'MIHIR GUPTA IN PITRI BLACK KURTA SET WITH PATIYALA AND DUPATTA',
      price: 'from Rs.16,999.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
      url: '/product/mihir-gupta-black-kurta',
    },
    {
      name: 'VIDHUR BLACK KURTA SET',
      price: 'from Rs.21,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
      url: '/product/vidhur-black-kurta',
    },
    {
      name: 'RISHABH CHAWLA IN KURTA SET WITH TROUSER AND DUPATTA',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
      url: '/product/rishabh-chawla-kurta',
    },
    {
      name: 'SHASHWAT BLACK KURTA SET',
      price: 'from Rs.21,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
      url: '/product/shashwat-black-kurta',
    },
    {
      name: 'AARV WINE KURTA SET',
      price: 'from Rs.21,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
      url: '/product/aarv-wine-kurta',
    },
  ];

  ngOnDestroy() {
    sessionStorage.removeItem('selectedProduct');
  }

  addToCart() {
    const token = localStorage.getItem('token');

    if (token) {
      // ✅ Logged in user — send to backend
      this.productServices.addCart(this.product._id).subscribe({
        next: (res) => {
          console.log('🛒 Cart added for logged-in user:', res);
        },
        error: (err) => {
          console.error('❌ Error adding to cart:', err);
        },
      });
    } else {
      // ❌ Guest user — Save in sessionStorage

      // Check existing guest cart
      const guestCart = sessionStorage.getItem('guestCart');
      let guestItems = guestCart ? JSON.parse(guestCart) : [];

      // Check if product already exists (avoid duplicates)
      const exists = guestItems.find(
        (item: any) => item._id === this.product._id
      );

      if (!exists) {
        guestItems.push({
          ...this.product,
          quantity: this.quantity,
        });
        sessionStorage.setItem('guestCart', JSON.stringify(guestItems));
        console.log('🛒 Product added to guest cart:', guestItems);
      } else {
        console.log('⚠️ Product already in guest cart.');
      }
    }
  }
}
